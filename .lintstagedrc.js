module.exports = {
  '*.ts': [
    'echo "it works"',
    'npm run test:lintStaged',
    'npm run lint',
  ]
}
