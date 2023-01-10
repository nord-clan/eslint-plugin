import dedent from 'dedent';

import rule from '../../../rules/feature-slice-isolation';
import { TS_FILE_PATH, tsRuleTester } from '../utils';

tsRuleTester.run(rule.name, rule.value, {
  invalid: [],
  valid: [
    {
      code: dedent`
                import { K } from "../../something"
                import { K } from "../../something"
            `,
      filename: TS_FILE_PATH,
    },
  ],
});
