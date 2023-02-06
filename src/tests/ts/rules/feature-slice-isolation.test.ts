import dedent from 'dedent';

import rule from '../../../rules/feature-slice-isolation';
import { TS_FILE_PATH, tsRuleTester } from '../utils';

tsRuleTester.run(rule.name, rule.value, {
  invalid: [
    {
      errors: [
        {
          messageId: 'default',
        },
      ],
      code: dedent`import { K } from "../widgets/index.ts"`,
      filename: `${TS_FILE_PATH}/layers/features/index.ts`,
    },
    {
      errors: [
        {
          messageId: 'default',
        },
      ],
      code: dedent`import { K } from "../app/index.ts"`,
      filename: `${TS_FILE_PATH}/layers/features/index.ts`,
    },
  ],
  valid: [
    {
      code: dedent`import { K } from "../features/index.ts"`,
      filename: `${TS_FILE_PATH}/layers/widgets/index.ts`,
    },
    {
      code: dedent`import { K } from "./feature/index.ts"`,
      filename: `${TS_FILE_PATH}/layers/features/index.ts`,
    },
    {
      code: dedent`import { K } from "./unnamed/index.ts"`,
      filename: `${TS_FILE_PATH}/layers/features/index.ts`,
    },
  ],
});
