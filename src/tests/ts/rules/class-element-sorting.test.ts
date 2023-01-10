import dedent from 'dedent';

import rule from '../../../rules/class-element-sorting';
import { TS_FILE_PATH, tsRuleTester } from '../utils';

tsRuleTester.run(rule.name, rule.value, {
  invalid: [
    {
      errors: [
        {
          messageId: 'default',
        },
      ],
      code: dedent`
                export class Person {

                    static ben() {
                        return "1"
                    }

                    static alberta() {
                        return "1"
                    }

                    static cent() {
                        return "1"
                    }

                    static amstrong = "1"
                    static beta = "1"
                    static cyprus = "1"

                    public static delta = "1"
                    public static ecma = "1"
                    public static flight = "1"

                    public static belgium() {
                        return "1"
                    }

                    public static alabama() {
                        return "1"
                    }

                    public static cape() {
                        return "1"
                    }

                    private static drums = "1"
                    private static elephant = "1"
                    private static flower = "1"

                    public dark = 1
                    public exist = 1
                    public flip = 1

                    private dolby = 1
                    private excited = 1
                    private fuck = 1

                    private static belfast() {
                        return "1"
                    }

                    private static crickets() {
                        return "1"
                    }

                    private static astronomy() {
                        return "1"
                    }

                    public centSomeMore() {
                        return "3"
                    }

                    private addMeToo() {
                        return "3"
                    }

                    constructor(name: string) {
                        this.dark = name
                    }

                    get add() {
                        return "1"
                    }

                    get belittle() {
                        return "2"
                    }

                    get cry() {
                        return "3"
                    }

                    set begin() {
                        return "2"
                    }

                    set come() {
                        return "3"
                    }

                    private countMeIn() {
                        return "3"
                    }

                    set amplify() {
                        return "1"
                    }

                    public addSomethingElse() {
                        return "3"
                    }

                    public beatSomeMore() {
                        return "3"
                    }

                    private beatMeToo() {
                        return "3"
                    }
                }
            `,
      filename: `${TS_FILE_PATH}/index.ts`,
      output: dedent`
                export class Person {
                static alberta() {
                        return "1"
                    }
                static ben() {
                        return "1"
                    }
                static cent() {
                        return "1"
                    }
                public static alabama() {
                        return "1"
                    }
                public static belgium() {
                        return "1"
                    }
                public static cape() {
                        return "1"
                    }
                private static astronomy() {
                        return "1"
                    }
                private static belfast() {
                        return "1"
                    }
                private static crickets() {
                        return "1"
                    }
                static amstrong = "1"
                static beta = "1"
                static cyprus = "1"
                public static delta = "1"
                public static ecma = "1"
                public static flight = "1"
                private static drums = "1"
                private static elephant = "1"
                private static flower = "1"
                public dark = 1
                public exist = 1
                public flip = 1
                private dolby = 1
                private excited = 1
                private fuck = 1
                constructor(name: string) {
                        this.dark = name
                    }
                get add() {
                        return "1"
                    }
                get belittle() {
                        return "2"
                    }
                get cry() {
                        return "3"
                    }
                set amplify() {
                        return "1"
                    }
                set begin() {
                        return "2"
                    }
                set come() {
                        return "3"
                    }
                public addSomethingElse() {
                        return "3"
                    }
                public beatSomeMore() {
                        return "3"
                    }
                public centSomeMore() {
                        return "3"
                    }
                private addMeToo() {
                        return "3"
                    }
                private beatMeToo() {
                        return "3"
                    }
                private countMeIn() {
                        return "3"
                    }
                }
            `,
    },
  ],
  valid: [
    {
      filename: `${TS_FILE_PATH}/index.ts`,
      code: dedent`
                export class Person {
                    static alberta() {
                        return "1"
                    }

                    static ben() {
                        return "1"
                    }

                    static cent() {
                        return "1"
                    }

                    public static alabama() {
                        return "1"
                    }

                    public static belgium() {
                        return "1"
                    }

                    public static cape() {
                        return "1"
                    }

                    private static astronomy() {
                        return "1"
                    }

                    private static belfast() {
                        return "1"
                    }

                    private static crickets() {
                        return "1"
                    }

                    static amstrong = "1"
                    static beta = "1"
                    static cyprus = "1"

                    public static delta = "1"
                    public static ecma = "1"
                    public static flight = "1"

                    private static drums = "1"
                    private static elephant = "1"
                    private static flower = "1"

                    public dark = 1
                    public exist = 1
                    public flip = 1

                    private dolby = 1
                    private excited = 1
                    private fuck = 1

                    constructor(name: string) {
                        this.dark = name
                    }

                    get add() {
                        return "1"
                    }

                    get belittle() {
                        return "2"
                    }

                    get cry() {
                        return "3"
                    }

                    set amplify() {
                        return "1"
                    }

                    set begin() {
                        return "2"
                    }

                    set come() {
                        return "3"
                    }

                    public addSomethingElse() {
                        return "3"
                    }

                    public beatSomeMore() {
                        return "3"
                    }

                    public centSomeMore() {
                        return "3"
                    }

                    private addMeToo() {
                        return "3"
                    }

                    private beatMeToo() {
                        return "3"
                    }

                    private countMeIn() {
                        return "3"
                    }
                }
            `,
    },
  ],
});
