// @see https://github.com/release-it/release-it/blob/master/config/release-it.json
module.exports = {
  //@see https://github.com/release-it/release-it/blob/master/docs/git.md
  git: {
    requireCleanWorkingDir: true,
    requireUpstream: false,
    commitMessage: 'release: ${version}',
    tagAnnotation: 'Release ${version}',
    tagName: '${version}',
    push: true,
    pushRepo: 'origin',
    // 个性化你的 Git Log 的输出格式 see:https://ruby-china.org/topics/939
    changelog: 'git log --pretty=format:"%s %C(bold blue)(%an)%Creset" --abbrev-commit',
  },
  hooks: {
    "before:init": ["npm run lint", "npm test"],
    'after:bump': ['npm run build', 'npm run changelog'],
  },
  npm: {
    publish: true,
  },
}
