import { refineText } from "./refineText";
import { lorem } from "faker";

describe("refineText", () => {
  it.each`
    source             | expected
    ${"hello world"}   | ${"hello world"}
    ${"hello  world"}  | ${"hello world"}
    ${"hello   world"} | ${"hello world"}
  `('sut transforms "$source" to "$expected"', ({ source, expected }) => {
    const result = refineText(source);
    expect(result).toBe(expected);
  });

  it.each`
    source             | expected
    ${"hello\t world"} | ${"hello world"}
  `(
    'sut transforms "$source" that contains tab charactor to "$expected"',
    ({ source, expected }) => {
      const result = refineText(source);
      expect(result).toBe(expected);
    }
  );

  it.each`
    source             | banedWords               | expected
    ${"hello mockist"} | ${["mockist", "purist"]} | ${"hello *******"}
    ${"hello purist"}  | ${["mockist", "purist"]} | ${"hello ******"}
  `(
    'sut transforms "$source" to "$expected"',
    ({ source, banedWords, expected }) => {
      const result = refineText(source);
      expect(result).toBe(expected);
    }
  );

  describe("given banned word", () => {
    const bannedWord = lorem.word();
    const source = "hello " + bannedWord;
    const masked = "hello " + "*".repeat(bannedWord.length);

    it(`"${bannedWord}" when invoke sut then it returns "hello ${masked}"`, () => {
      const result = refineText(source, { bannedWords: [bannedWord] });
      expect(result).toBe(masked);
    });
  });
});
