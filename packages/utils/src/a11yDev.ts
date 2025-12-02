export function initAxeDev() {
	if (typeof window === 'undefined') return;
	try {
		// Dynamically require to avoid bundling in production
		// @ts-ignore
		const axe = require('@axe-core/react');
		// @ts-ignore
		const React = require('react');
		// @ts-ignore
		const ReactDOM = require('react-dom');
		axe(React, ReactDOM, 1000);
	} catch {
		// axe not installed; ignore
	}
}
