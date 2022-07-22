### !!! FudgeCore got some Problems, please download the Files and play it on your local Server  !!!

# LastSuperBowl

# Information:
- Author:           Felix Iwertowski
- Year and Season:  Sommersemester 2022
- Semester:         7th
- Course:           Prima
- Docent:           [Prof. Jirka Dell´Oro-Friedl](https://github.com/JirkaDellOro)
- Link to Pages:     [LastSuperBowl](https://felixiwer.github.io//LastSuperBowlPrimaAbgabe2022/index.html)
- Link to Source:   [LastSuperBowl Code ](https://github.com/FelixIwer/LastSuperBowlPrimaAbgabe2022/tree/main/Script/Source)
- Link to Conceptpaper:   [LastSuperBowl Concept ](https://github.com/FelixIwer/LastSuperBowlPrimaAbgabe2022/blob/main/Documents/The%20Last%20Super%20BowlSS22.pdf)

### Install: Download the Files and run it on a local Server.

### Checklist for the final assignment

| Nr | Criterion       | Explanation                                                                                                              |
|---:|-------------------|---------------------------------------------------------------------------------------------------------------------|
|  1 | Units and Positions | An X-Y coordinate system was used. Camera was fixed at point that it seems as it would be 2D but it is 3 dimensional. Everything in the Canvas was sized for the Viewer to see it at a good height. |
|  2 | Hierarchy         | There is a Main Node called Game. All Things seen in the Scene are childs of the Game Node except the Football, which is loaded in as a child later. |
|  3 | Editor            | The things seen in the Canvas are made in Editor. |
|  4 | Scriptcomponents  | The Scripts are mainly used for the Football and the Hero and their Collisions. |
|  5 | Extend            | The CustomComponents Scripts were extended as seen in the Code. |
|  6 | Sound             | The Sounds were used for Background noise of a stadium and when picking up the Football. |
|  7 | VUI               | The Interface is minimized to the score. |
|  8 | Event-System      | Event System is used for collision between the Hero and for example the Football. |
|  9 | External Data     | There is one Json File with information about the Camera, because of hardcoded Numbers. |
|  A | Light             | There is one source of light in the Scene appended to the Game Node. |
|  B | Physics           | Rigidbodys were used. |
|  C | Net               | |
|  D | State Machines    | |
|  E | Animation         | |