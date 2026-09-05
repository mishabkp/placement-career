Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\kpmiz\.gemini\antigravity-ide\brain\29b34bda-32e4-4c27-9dc9-e8c1c41f88b0\.user_uploaded\media_1787588502648.jpg"
$outDir = "c:\Users\kpmiz\Desktop\Finalyear-Project\public\animation"

if (!(Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force | Out-Null
}

$img = [System.Drawing.Bitmap]::FromFile($srcPath)
Write-Host "Source image dimensions: $($img.Width) x $($img.Height)"

# The image has 3 panels side by side with text headers on top
# Let's crop each panel excluding the top label text ("STARTING FRAME", etc.)
# Let's inspect where the panels start and end

$w = $img.Width
$h = $img.Height

# We can crop 3 equal third columns or detect panel boundaries
# Usually the top 10-15% is the header labels, and the rest is the 3 panels
$topOffset = [int]($h * 0.12)
$panelHeight = $h - $topOffset

$panelWidth = [int]($w / 3)

# Save full image as well just in case
$img.Save("$outDir\full_frames.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)

for ($i = 0; $i -lt 3; $i++) {
    $x = $i * $panelWidth
    $rect = New-Object System.Drawing.Rectangle($x, $topOffset, $panelWidth, $panelHeight)
    
    $cropped = New-Object System.Drawing.Bitmap($panelWidth, $panelHeight)
    $g = [System.Drawing.Graphics]::FromImage($cropped)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    
    $destRect = New-Object System.Drawing.Rectangle(0, 0, $panelWidth, $panelHeight)
    $g.DrawImage($img, $destRect, $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    
    $frameNum = $i + 1
    $outPath = "$outDir\frame$frameNum.jpg"
    $cropped.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $cropped.Dispose()
    Write-Host "Saved frame $frameNum to $outPath"
}

$img.Dispose()
Write-Host "Done cropping frames!"
