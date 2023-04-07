import type { IApi } from 'dumi';
import hostedGitInfo from 'hosted-git-info';
import path from 'path';
import { merge, readPkgJson } from './utils';

export default async (api: IApi) => {
  const pkg = await readPkgJson(path.join(api.paths.cwd, 'package.json'));
  const gitHost = hostedGitInfo.fromUrl(pkg.repository.url);

  const packageName = pkg.name;
  const projectName = gitHost?.project ?? packageName.replace(/^@.*\//, '');
  const absSrcPath = path.join(api.paths.cwd, 'src');

  // use `usage`, `vercel` Deployment needs to be overridden with this environment variable
  let basePath = process.env.BASE_PATH;

  // github pages support
  if (!basePath && process.env.CI) {
    basePath = `/${projectName}/`;
  }

  basePath ??= '/'; // fallback to default value

  // modify default build config for all rc projects
  api.modifyDefaultConfig((memo) =>
    merge(memo, {
      favicons: ['https://github.com/react-component.png?size=64'],

      // use default theme
      themeConfig: {
        name: projectName,
        logo: 'https://github.com/react-component.png?size=128',
      },

      outputPath: '.doc',
      alias: {
        [`${packageName}$`]: absSrcPath,
        [`${packageName}/lib`]: absSrcPath,
        [`${packageName}/es`]: absSrcPath,
        // assets
        [`${packageName}/assets`]: path.join(api.paths.cwd, 'assets'),
      },

      basePath,
      publicPath: basePath,
    } as IApi['userConfig']),
  );
};
