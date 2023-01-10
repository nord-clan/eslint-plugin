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
