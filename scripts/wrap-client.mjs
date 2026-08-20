// Shared client-bundle wrapper: the web GUI loads plugin bundles through
// window.__ModuleLoader__, so the CJS output must be wrapped in a factory.
export function wrapClient(source, name) {
  return [
    `/* ${name} client bundle — generated from src/client.cjs */`,
    'window.__ModuleLoader__.load({',
    `  id: ${JSON.stringify(name)},`,
    '  factory: (require) => {',
    '    var module = { exports: {} };',
    '    var exports = module.exports;',
    source.replace(/\s+$/, ''),
    '    return module.exports;',
    '  },',
    '});',
    '',
  ].join('\n')
}
