# Review library

Use this to plan cumulative reviews. The site's **Review library** tab shows the same information live.

## Where her data lives
1. **`library/history.json`** holds results from before the Math Lab, written down by hand:
   - Topic 1 worksheet weak spots (9/29)
   - Topic 2 practice set (10/25)
   - Topic 2 error-focus test (10/27), mastery test (10/28), and quiz practice test 1 (11/1)

   `events[]` has one entry per question: `{d, src, skill, res: first|helped|missed, q, given, correct}`. `tests[]` has one entry per test.
2. **Live lab data** is in the Worker:
   - `GET https://avi-math-sync.mrnarang.workers.dev/c/rounds` returns every finished round: score, missed skills, time, streak.
   - `GET …/c/progress` returns the full state of every quiz, drill and review. Each item records her status (first, guided or working), how many tries, and the wrong answers she picked.
3. **School results** are at `GET …/c/school`: date, type, title, score, the lessons she missed, notes, and files. Each file is at `GET …/f/<fid>`.

## Status rules (Review tab)
- **Needs work:** her last attempt at the skill wasn't right on the first try, or she's below 60% first-try after 3 or more attempts.
- **Watch:** a miss in her last 3 attempts, or a school result flagged that lesson.
- **Solid:** her recent attempts were all right on the first try.

## Tests in the library
| Test | Lessons | Layout |
|---|---|---|
| Topic 3 Quiz prep (`T3-QZ`) | 3-1, 3-2, 3-4, 3-5, 3-6 | Assessment test (28 questions), then 10-question rounds, then a 25-question practice test. She needs 100% on 2 practice tests in a row. |
| Cumulative review (`CUM-1-3`) | 1-5 to 1-7, 2-1 to 2-4, 3-1 to 3-6 | 30 questions across every lesson, plus up to 6 re-tests on weak spots, then strengthen rounds and timed tests |
| Weak-spot round (`WEAK-<time>`) | Her 5 weakest skills | 10 questions |
| Skill drill (`DRILL-<skill>`) | One skill | 10 questions |

The question generators (43 skills) are listed in `src/gen.js` (Topic 3), `src/t2adapter.js` (Topic 2 plus the Topic 1 review skills) and `src/gen1.js` (Topic 1). Each lab skill key maps to its lesson in `LESSON`.

## Archive
- `archive/topic1-inequality-check.html`: Topic 1 check (9/29), 7 skills × easy, medium and hard
- `archive/topic2-practice-set.html`: Topic 2 practice set (10/25), 27 questions
- `archive/topic2-test-series.html`: Topic 2 timed tests and Unit 2 quiz practice (10/26 to 11/1)

These are copies of Claude artifacts. On GitHub they open and run, but they don't save results.
