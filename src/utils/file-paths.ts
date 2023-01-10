import path from 'path';

export function isParentFolder(relativeFilePath: string, context: any, rootDir: string) {
  const absoluteRootPath = context.getCwd() + (rootDir !== '' ? path.sep + rootDir : '');
  const absoluteFilePath = path.join(path.dirname(context.getFilename()), relativeFilePath);

  return (
    relativeFilePath.startsWith('../') &&
    (rootDir === '' ||
      (absoluteFilePath.startsWith(absoluteRootPath) &&
        context.getFilename().startsWith(absoluteRootPath)))
  );
}

export function isSameFolder(path: string) {
  return path.startsWith('./');
}

export function getAbsolutePath(
  relativePath: string,
  context: any,
  rootDir: string,
  prefix: string,
) {
  return [
    prefix,
    ...path
      .relative(
        context.getCwd() + (rootDir !== '' ? path.sep + rootDir : ''),
        path.join(path.dirname(context.getFilename()), relativePath),
      )
      .split(path.sep),
  ]
    .filter(String)
    .join('/');
}

export function getParsedPath(context: any) {
  const cwd = path.resolve(context.getCwd());
  const filePath = context.getFilename();

  const absolutePath = path.resolve(filePath);
  const relativePath = path.relative(cwd, absolutePath);
  const parsed = path.parse(relativePath);

  return {
    ...parsed,
    ext: parsed.ext.slice(1),
    path: relativePath,
  };
}
