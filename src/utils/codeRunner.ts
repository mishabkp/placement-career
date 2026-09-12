import type { TestCase } from '../data/codeChallenges';

export interface ConsoleLog {
  id: string;
  type: 'log' | 'warn' | 'error' | 'info';
  message: string;
  time: string;
}

export interface TestResult {
  testCaseId: number;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  runtimeMs: number;
  error?: string;
  logs: string[];
  isHidden?: boolean;
}

export interface ExecutionReport {
  success: boolean;
  totalPassed: number;
  totalCases: number;
  results: TestResult[];
  consoleLogs: ConsoleLog[];
  totalRuntimeMs: number;
  errorMessage?: string;
}

// Deep equality helper for arrays, objects, primitives
function isDeepEqual(a: any, b: any): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!isDeepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  if (typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    for (const key of keysA) {
      if (!keysB.includes(key) || !isDeepEqual(a[key], b[key])) return false;
    }
    return true;
  }

  return false;
}

function formatOutput(val: any): string {
  if (val === undefined) return 'undefined';
  if (val === null) return 'null';
  if (typeof val === 'string') return `"${val}"`;
  if (typeof val === 'object') {
    try {
      return JSON.stringify(val);
    } catch {
      return String(val);
    }
  }
  return String(val);
}

/**
 * Executes user JavaScript code in a controlled sandboxed environment against test cases.
 */
export async function runJavaScriptCode(
  userCode: string,
  functionName: string,
  testCases: TestCase[]
): Promise<ExecutionReport> {
  const consoleLogs: ConsoleLog[] = [];
  const testResults: TestResult[] = [];
  const startTime = performance.now();

  const addLog = (type: ConsoleLog['type'], ...args: any[]) => {
    const msg = args
      .map((arg) => (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)))
      .join(' ');
    consoleLogs.push({
      id: Math.random().toString(36).substring(2, 9),
      type,
      message: msg,
      time: new Date().toLocaleTimeString(),
    });
  };

  try {
    // Intercept console within execution wrapper
    const sandboxConsole = {
      log: (...args: any[]) => addLog('log', ...args),
      warn: (...args: any[]) => addLog('warn', ...args),
      error: (...args: any[]) => addLog('error', ...args),
      info: (...args: any[]) => addLog('info', ...args),
    };

    // Safely compile the user's function
    // We construct a Function that receives 'console' and returns the target function
    const wrappedCode = `
      "use strict";
      ${userCode}
      if (typeof ${functionName} === 'function') {
        return ${functionName};
      }
      throw new Error("Function '${functionName}' is not defined. Please check your function signature.");
    `;

    const factory = new Function('console', wrappedCode);
    const userFunc = factory(sandboxConsole);

    let allPassed = true;

    for (const tc of testCases) {
      const caseStartTime = performance.now();
      const caseLogs: string[] = [];

      try {
        // Clone raw inputs so tests don't mutate shared inputs
        const inputArgs = JSON.parse(JSON.stringify(tc.rawInput));

        // Execute user function
        const result = userFunc(...inputArgs);
        const caseEndTime = performance.now();
        const runtime = Math.round((caseEndTime - caseStartTime) * 100) / 100;

        const passed = isDeepEqual(result, tc.rawExpected);
        if (!passed) allPassed = false;

        testResults.push({
          testCaseId: tc.id,
          input: tc.input,
          expectedOutput: tc.expectedOutput,
          actualOutput: formatOutput(result),
          passed,
          runtimeMs: runtime,
          logs: caseLogs,
          isHidden: tc.isHidden,
        });
      } catch (err: any) {
        allPassed = false;
        const caseEndTime = performance.now();
        testResults.push({
          testCaseId: tc.id,
          input: tc.input,
          expectedOutput: tc.expectedOutput,
          actualOutput: 'Runtime Error',
          passed: false,
          runtimeMs: Math.round((caseEndTime - caseStartTime) * 100) / 100,
          error: err?.message || String(err),
          logs: caseLogs,
          isHidden: tc.isHidden,
        });
        addLog('error', `Test Case #${tc.id} Error: ${err?.message || err}`);
      }
    }

    const totalRuntime = Math.round((performance.now() - startTime) * 100) / 100;
    const passedCount = testResults.filter((r) => r.passed).length;

    return {
      success: allPassed,
      totalPassed: passedCount,
      totalCases: testCases.length,
      results: testResults,
      consoleLogs,
      totalRuntimeMs: totalRuntime,
    };
  } catch (err: any) {
    const totalRuntime = Math.round((performance.now() - startTime) * 100) / 100;
    addLog('error', `Compilation / Syntax Error: ${err?.message || err}`);

    return {
      success: false,
      totalPassed: 0,
      totalCases: testCases.length,
      results: testCases.map((tc) => ({
        testCaseId: tc.id,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput: 'Compilation Error',
        passed: false,
        runtimeMs: 0,
        error: err?.message || String(err),
        logs: [],
        isHidden: tc.isHidden,
      })),
      consoleLogs,
      totalRuntimeMs: totalRuntime,
      errorMessage: err?.message || String(err),
    };
  }
}

/**
 * Runs user code on custom arbitrary input string (e.g. "[1,2,3], 5")
 */
export async function runCustomInput(
  userCode: string,
  functionName: string,
  customInputString: string
): Promise<{ output: string; runtimeMs: number; error?: string; logs: ConsoleLog[] }> {
  const consoleLogs: ConsoleLog[] = [];
  const startTime = performance.now();

  const addLog = (type: ConsoleLog['type'], ...args: any[]) => {
    const msg = args
      .map((arg) => (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)))
      .join(' ');
    consoleLogs.push({
      id: Math.random().toString(36).substring(2, 9),
      type,
      message: msg,
      time: new Date().toLocaleTimeString(),
    });
  };

  try {
    const sandboxConsole = {
      log: (...args: any[]) => addLog('log', ...args),
      warn: (...args: any[]) => addLog('warn', ...args),
      error: (...args: any[]) => addLog('error', ...args),
      info: (...args: any[]) => addLog('info', ...args),
    };

    // Safely parse user input arguments
    // Handles expressions like: [2, 7, 11, 15], 9 or "()"
    let parsedArgs: any[] = [];
    try {
      const parsed = new Function(`return [${customInputString}];`)();
      parsedArgs = parsed;
    } catch {
      throw new Error(`Failed to parse custom input: "${customInputString}". Make sure parameters are comma-separated valid JavaScript/JSON values.`);
    }

    const wrappedCode = `
      "use strict";
      ${userCode}
      if (typeof ${functionName} === 'function') {
        return ${functionName};
      }
      throw new Error("Function '${functionName}' is not defined.");
    `;

    const factory = new Function('console', wrappedCode);
    const userFunc = factory(sandboxConsole);
    const result = userFunc(...parsedArgs);
    const runtimeMs = Math.round((performance.now() - startTime) * 100) / 100;

    return {
      output: formatOutput(result),
      runtimeMs,
      logs: consoleLogs,
    };
  } catch (err: any) {
    const runtimeMs = Math.round((performance.now() - startTime) * 100) / 100;
    return {
      output: 'Execution Error',
      runtimeMs,
      error: err?.message || String(err),
      logs: consoleLogs,
    };
  }
}
