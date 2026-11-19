export type Options = {
	/**
	Include other users' processes as well as your own.

	On Windows this has no effect and will always be all users' processes.

	@default true
	*/
	readonly all?: boolean;
};

export type ProcessDescriptor = {
	readonly pid: number;
	readonly name: string;
	readonly ppid: number;

	/**
	Full command line with arguments.

	Not supported on Windows.
	*/
	readonly cmd?: string;

	/**
	The arguments the process was started with, excluding the command itself.

	Read from procfs, so an argument containing a space stays a single entry and empty arguments are preserved. Reflects what the process exposes when it is read, so a process that rewrites its own arguments reports the rewritten ones. `undefined` when the process cannot be read, and `[]` for a kernel thread.

	Only available on Linux.

	Not supported on Windows or macOS.
	*/
	readonly args?: string[];

	/**
	CPU usage as a percentage (0-100).

	Not supported on Windows.
	*/
	readonly cpu?: number;

	/**
	Memory usage as a percentage (0-100).

	Not supported on Windows.
	*/
	readonly memory?: number;

	/**
	User ID of the process owner.

	Not supported on Windows.
	*/
	readonly uid?: number;

	/**
	Best-effort attempt to get the full executable path.
	- Linux: Reads from `/proc/{pid}/exe` when available
	- macOS: Extracted from command line when possible
	- Falls back to `comm` (which may be truncated)

	Not supported on Windows.
	*/
	readonly path?: string;

	/**
	The date and time when the process was started.

	Not supported on Windows. May be `undefined` if the date cannot be parsed.
	*/
	readonly startTime?: Date;
};

/**
Get running processes.

@returns A list of running processes.

@example
```
import psList from 'ps-list';

console.log(await psList());
//=> [{pid: 3213, name: 'node', cmd: 'node test.js', ppid: 1, uid: 501, cpu: 0.1, memory: 1.5, path: '/usr/local/bin/node', startTime: 2025-01-15T10:30:00.000Z}, …]
```
*/
export default function psList(options?: Options): Promise<ProcessDescriptor[]>;

/**
Split a `/proc/{pid}/cmdline` payload into its argument vector, excluding `argv[0]`.

@param cmdline - The raw, NUL-delimited file contents.
*/
export function parseCmdline(cmdline: string): string[];
