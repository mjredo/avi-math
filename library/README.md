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
| Topic N Quiz 1 / Quiz 2 / Test (`TN-QA`, `TN-QB`, `TN-CH`) | Half a topic / half a topic / all of it | First test (20 or 25 questions plus re-tests), then strengthen rounds, then timed tests until she gets 100% twice |
| Cumulative review (`CUM-1-N`) | Topics 1 through N | 30 questions plus up to 6 re-tests on weak spots |
| Weak-spot round (`WEAK-<time>`) | Her 5 weakest skills | 10 questions |
| Skill drill (`DRILL-<skill>`) | One skill | 10 questions |

## Question bank: 94 skills, every lesson of the year
| File | Lessons |
|---|---|
| `src/genY1.js` | 1-1 to 1-4, 3-3 |
| `src/gen1.js` | 1-5, 1-6 |
| `src/t2adapter.js` | 2-1 to 2-4, plus 1-5 and 1-7 review (from the Topic 2 Test Series) |
| `src/gen.js` | 3-1, 3-2, 3-4, 3-5, 3-6 |
| `src/genY2.js` | Topics 4, 5, 6 |
| `src/genY3.js` | Topics 7, 8, 9 |
| `src/genY4.js` | Topics 10, 11 |

`node src/verify2.js` builds 1,500 questions for every skill and variant (313,500 in all). It checks for 4 distinct choices, valid steps, no NaN, and that GCF answers are fully factored. `node src/sample.js <prefix>` prints sample questions, so you can read them over.

## Whole-year layout
- Every topic has **Quiz 1, Quiz 2 and a Topic test**. Each quiz covers half of the topic's lessons. The split is set in `QSPLIT` in `src/course.js`; change it when the teacher's quizzes differ.
- **Cumulative tests:** `CUM-1-N` covers Topics 1 through N. The Review tab has buttons for "so far" (`CUR_TOPIC` in `src/library.js`), Semester 1 (Topics 1–5) and Year-end (Topics 1–11), plus a picker for any range.
- **Real quiz prep**, built from the teacher's lessons, is a `mid` assessment, like `T3-QZ`.

## Feedback loop
- She can tap **⚑ Flag** on any question to report it as confusing or wrong. Each flag is saved to `results/flag-<time>`, with the exact spec (generator, variant, seed), the question, the choices and her note.
- Claude reads `/c/results` (the work record plus flags), `/c/rounds` and `/c/progress`. It fixes or replaces flagged generators, adds steps for repeat mistakes, and republishes.

## Archive
- `archive/topic1-inequality-check.html`: Topic 1 check (9/29), 7 skills × easy, medium and hard
- `archive/topic2-practice-set.html`: Topic 2 practice set (10/25), 27 questions
- `archive/topic2-test-series.html`: Topic 2 timed tests and Unit 2 quiz practice (10/26 to 11/1)

These are copies of Claude artifacts. On GitHub they open and run, but they don't save results.

## Weekly routine (same as Araaya's lab)
The site already has the whole year laid out (All quizzes & tests tab). Each topic gets Quiz 1, Quiz 2 and a Topic test once its questions are built. Each week:
1. **Before a new topic or quiz:** Manoj sends what's on it (a screenshot of the lessons, or the teacher's practice quiz). Claude builds or refines the generators for those lessons, plus a prep assessment laid out like the teacher's quiz, the way `T3-QZ` is.
2. **During the week:** Claude reads `/c/results` (the readable work record), `/c/rounds` and `/c/progress`. It fixes any question that was confusing or wrong, and adds targeted generators or steps for repeat mistakes.
3. **After school results come back:** Aviaana or Manoj uploads the graded paper in Review library → School results and ticks the lessons she missed. Those lessons move up in the weak-spot rounds and the cumulative review.
4. **Before semester or cumulative tests:** use Review library → Cumulative review, plus weak-spot rounds, until her practice tests are at 100%.
