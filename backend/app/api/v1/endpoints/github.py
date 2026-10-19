from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import requests
from app.core.gemini import safe_generate, parse_json_response
import json

router = APIRouter()


class GithubRequest(BaseModel):
    username: str


@router.post("/analyze")
async def analyze_github(req: GithubRequest):
    """
    Fetches GitHub public profile data (no API key needed),
    then runs AI analysis via Gemini.
    """
    headers = {"Accept": "application/vnd.github.v3+json"}

    # --- Fetch GitHub user info ---
    try:
        user_res = requests.get(
            f"https://api.github.com/users/{req.username}",
            headers=headers,
            timeout=10,
        )
    except requests.RequestException as e:
        raise HTTPException(status_code=503, detail=f"GitHub API unreachable: {str(e)}")

    if user_res.status_code == 404:
        raise HTTPException(status_code=404, detail=f"GitHub user '{req.username}' not found.")
    if user_res.status_code != 200:
        raise HTTPException(status_code=502, detail="GitHub API error. Please try again.")

    user = user_res.json()

    # --- Fetch repos ---
    repos_res = requests.get(
        f"https://api.github.com/users/{req.username}/repos?sort=updated&per_page=10",
        headers=headers,
        timeout=10,
    )
    repos = repos_res.json() if repos_res.status_code == 200 else []

    # Filter own repos (not forks) and build summary
    own_repos = [r for r in repos if not r.get("fork")]
    repo_summary = [
        {
            "name": r["name"],
            "language": r.get("language"),
            "stars": r.get("stargazers_count", 0),
            "description": r.get("description", ""),
        }
        for r in own_repos[:6]
    ]

    # Language frequency
    languages = [r["language"] for r in own_repos if r.get("language")]
    lang_freq: dict[str, int] = {}
    for lang in languages:
        lang_freq[lang] = lang_freq.get(lang, 0) + 1
    top_languages = sorted(lang_freq, key=lang_freq.get, reverse=True)[:4]

    # --- Gemini Analysis ---
    prompt = f"""
You are a technical recruiter evaluating a CS student's GitHub profile for campus placements.

Profile:
- Username: {user.get("login")}
- Name: {user.get("name", "N/A")}
- Bio: {user.get("bio", "N/A")}
- Public Repos: {user.get("public_repos", 0)}
- Followers: {user.get("followers", 0)}
- Top Languages: {', '.join(top_languages) if top_languages else 'None'}
- Notable Repos: {json.dumps(repo_summary)}

Respond ONLY with valid JSON (no markdown fences):
{{
  "profile_score": 72,
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "improvements": ["improvement 1", "improvement 2", "improvement 3"],
  "primary_languages": ["Language1", "Language2"],
  "placement_readiness": "A 1-sentence verdict for campus placement",
  "recommended_actions": ["Action 1", "Action 2", "Action 3"]
}}
"""
    try:
        raw = safe_generate(prompt)
        analysis = parse_json_response(raw)
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="AI returned invalid JSON. Please retry.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Error: {str(e)}")

    return {
        "username": req.username,
        "github_data": {
            "name": user.get("name"),
            "bio": user.get("bio"),
            "public_repos": user.get("public_repos"),
            "followers": user.get("followers"),
            "following": user.get("following"),
            "avatar_url": user.get("avatar_url"),
            "html_url": user.get("html_url"),
            "top_languages": top_languages,
            "total_stars": sum(r["stars"] for r in repo_summary),
        },
        "ai_analysis": analysis,
    }
