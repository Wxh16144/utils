// @see https://github.com/release-it/release-it/blob/master/config/release-it.json
module.exports = {
  // @see https://github.com/release-it/release-it/blob/master/docs/git.md
  git: {
    requireCleanWorkingDir: true,
    requireUpstream: false,
    commitMessage: 'release: ${version}',
    tagAnnotation: 'Release ${version}',
    tagName: '${version}',
    push: true,
    pushRepo: 'origin',
  },
  // @see https://github.com/release-it/release-it/blob/master/docs/github-releases.md
  github: {
    release: true,
    web: true,
  },
  hooks: {
    'before:init': ['npm run lint', 'npm test -- run'],
    'after:bump': ['npm run build'],
  },
  npm: {
    publish: true,
  },
  plugins: {
    '@release-it/conventional-changelog': {
      preset: 'angular',
      infile: 'CHANGELOG.md',
    },
  },
}
