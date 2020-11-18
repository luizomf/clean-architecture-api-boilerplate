module.exports = {
  '*.ts': [
    'echo "it works"',
    'npm run test:lintStaged',
    'eslint "src/**/*.ts" --fix',
  ]
}
