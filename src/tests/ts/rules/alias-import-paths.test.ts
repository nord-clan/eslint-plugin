import dedent from 'dedent';

import rule from '../../../rules/alias-import-paths';
import { TS_FILE_PATH, tsRuleTester } from '../utils';

tsRuleTester.run(rule.name, rule.value, {
  invalid: [
    {
      errors: [
        {
          messageId: 'default',
        },
      ],
      code: dedent`import { K } from "../features/index.ts"`,
      filename: `${TS_FILE_PATH}/layers/app/index.ts`,
      output: dedent`import { K } from "files/layers/features/index.ts"`,
    },
  ],
  valid: [],
});
