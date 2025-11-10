# Adding stuff
- Only change things inside of the INPUT folder. Github actions will do the rest.

## Adding Events
- Change /INPUT/eventlist/events.txt
- Use the following format.
```
Name=Super Awesome Tournament
Link=https://discord.com/events/12345678901234567890
Info=Put some information about the event here. Do not use quotation marks.
Time=28 July 2003 14:00 UTC
```

##Adding decklists
- Just throw them in /INPUT/decklists
- Use the following format.
```txt
4 Ad Nauseam
4 Angel's Grace
4 City of Brass

SIDEBOARD:
2 Boseiju, Who Shelters All
2 Echoing Truth
```

## Changing the Banlist/Watchlist
- Edit /INPUT/banlists/banlist.js and /INPUT/banlists/watchlist.js
