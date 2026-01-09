# Security Advisory: Next.js Security Vulnerabilities

## Summary

Three (3) security vulnerabilities have been identified in React Server Components (RSC) protocol that affect Next.js applications using App Router.

1. **CVE-2025-66478** - CRITICAL (CVSS 10.0) - Remote Code Execution
2. **CVE-2025-55184** - HIGH - Denial of Service
3. **CVE-2025-55183** - MEDIUM - Source Code Exposure

All vulnerabilities originate in the upstream React implementation and affect Next.js applications using App Router.

## Vulnerability Details

### 1. CVE-2025-66478 (Remote Code Execution) - CRITICAL
- **Severity:** CRITICAL (10.0/10)
- **Impact:** Remote Code Execution (RCE)
- **Description:** The vulnerable RSC protocol allowed untrusted inputs to influence server-side execution behavior, enabling attackers to craft requests that trigger unintended server execution paths resulting in remote code execution.

### 2. CVE-2025-55184 (Denial of Service) - HIGH
- **Severity:** HIGH
- **Impact:** Server hangs, denial of service
- **Description:** A specifically crafted HTTP request can be sent to any App Router endpoint that, when deserialized, can cause an infinite loop that hangs the server process and prevents future HTTP requests from being served.

### 3. CVE-2025-55183 (Source Code Exposure) - MEDIUM
- **Severity:** MEDIUM
- **Impact:** Source code and potential secret exposure
- **Description:** A specifically crafted HTTP request can cause a Server Function to return compiled source code of other Server Functions. This could reveal business logic. Secrets could also be exposed if they are defined directly in code (rather than accessed via environment variables at runtime).

## Affected Versions

- Next.js 15.x (unpatched versions)
- Next.js 16.x (unpatched versions)
- Next.js 14.3.0-canary.77 and later canary releases

**Not affected:**
- Next.js 13.x
- Next.js 14.x stable (unaffected by CVE-2025-55183/55184 but upgrade recommended)
- Pages Router applications
- Edge Runtime

## Fixed Versions

This project uses **Next.js 15.1.11**, which includes patches for all three vulnerabilities.

Fully patched versions by release line:

| Next.js Line | Patched Version | Vulnerabilities Fixed |
|--------------|----------------|---------------------|
| 15.0.x | 15.0.7 | All 3 CVEs |
| 15.1.x | 15.1.11 | All 3 CVEs ✅ **Current** |
| 15.2.x | 15.2.8 | All 3 CVEs |
| 15.3.x | 15.3.8 | All 3 CVEs |
| 15.4.x | 15.4.10 | All 3 CVEs |
| 15.5.x | 15.5.9 | All 3 CVEs |
| 16.0.x | 16.0.10 | All 3 CVEs |
| 14.x | 14.2.35 | DoS & Source Code Exposure (CVE-2025-66478 doesn't affect 14.x) |

## Current Stack Status

| Package | Version | Security Status |
|---------|---------|----------------|
| Next.js | 15.1.11 | ✅ Fully Patched |
| React | 18.3.1 | ✅ Compatible |
| React DOM | 18.3.1 | ✅ Compatible |
| Better Auth | 1.4.10 | ✅ Latest |
| Drizzle ORM | 0.41.0 | ✅ Compatible |

### Version Selection Rationale

**Using Next.js 15.1.11 instead of 16.1.1**

While Next.js 16.1.1 is available and also patched (16.0.10+ includes all fixes), this project uses 15.1.11 for the following reasons:

1. **Stability**: 15.x is a mature release line with fewer compatibility issues
2. **Turbopack Issues**: Next.js 16.x exhibited Turbopack-related module resolution errors (@swc/helpers, @vercel/turbopack/postcss) during initial testing
3. **Better Auth Compatibility**: 15.1.11 has better compatibility with Better Auth 1.4.10

**Security Note**: 15.1.11 is fully patched against all three known CVEs and provides the same security protections as 16.1.1.

## Required Actions Completed

1. ✅ Upgraded Next.js from vulnerable 15.0.0 to fully patched 15.1.11
2. ✅ All dependencies checked for compatibility
3. ✅ Turbopack issues resolved by using stable 15.1.11 release

## Additional Recommendations

### Immediate Actions
1. **Rotate secrets**: If your application was online and unpatched before December 4th, 2025, rotate all environment variables and secrets, starting with the most critical ones.
2. **Audit source code**: Review Server Functions for any hardcoded secrets or sensitive logic.

### Ongoing Practices
1. **Stay updated**: Monitor for security advisories from Next.js and React
2. **Audit dependencies**: Regularly run `pnpm audit` to check for vulnerabilities
3. **Use environment variables**: Never hardcode secrets in source code; always access via `process.env` at runtime

### Security Tools
```bash
# Check for known vulnerabilities in dependencies
pnpm audit

# Run the official Next.js security fix tool
npx fix-react2shell-next
```

## Resources

### Official Advisories
- [Next.js: CVE-2025-66478 (RCE)](https://nextjs.org/blog/CVE-2025-66478)
- [Next.js: December 11, 2025 Update (DoS & Source Exposure)](https://nextjs.org/blog/security-update-2025-12-11)
- [React: Critical Security Vulnerability in RSC](https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-components)
- [React: DoS and Source Code Exposure in RSC](https://react.dev/blog/2025/12/11/denial-of-service-and-source-code-exposure-in-react-server-components)

### CVE Records
- [CVE-2025-66478](https://www.cve.org/CVERecord?id=CVE-2025-66478) - RCE
- [CVE-2025-55182](https://www.cve.org/CVERecord?id=CVE-2025-55182) - RCE (React)
- [CVE-2025-55184](https://www.cve.org/CVERecord?id=CVE-2025-55184) - DoS
- [CVE-2025-55183](https://www.cve.org/CVERecord?id=CVE-2025-55183) - Source Code Exposure
- [CVE-2025-67779](https://www.cve.org/CVERecord?id=CVE-2025-67779) - Complete DoS Fix

### Fix Tools & Community
- [fix-react2shell-next Tool](https://github.com/vercel-labs/fix-react2shell-next)
- [Vercel Knowledge Base: React2Shell](https://vercel.com/kb/bulletin/react2shell)

## Change Log

| Date | Action | Details |
|-------|--------|---------|
| Jan 9, 2026 | Upgraded to 15.1.11 | Fully patched against all 3 CVEs |
| Jan 9, 2026 | Discovered additional CVEs | Updated from 15.1.9 (partial patch) to 15.1.11 (full patch) |
| Jan 9, 2026 | Created SECURITY.md | Initial documentation |

## Last Updated

January 9, 2026
