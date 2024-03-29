# rest-ftp
Adds RESTful HTTP wrapper to FTP

Based on [ftpfs](https://github.com/maxogden/ftpfs) and [rest-fs](https://github.com/anandkumarpatel/rest-fs) (currently via forks)

---
Docker: [rest-ftp](https://github.com/hasnat/rest-ftp) 

`docker pull hasnat/rest-ftp`

[docker-compose example](https://github.com/hasnat/rest-ftp/blob/master/docker-compose.yml)

`docker-compose up`
---

ENV Variables:
```
FTP_USER: admin         -- default blank
FTP_PASS: admin         -- default blank
FTP_HOST: ftp-server    -- default 127.0.0.1
FTP_PORT: 21            -- default 21
FTP_SECURE: false       -- default false
```
---

API: from [rest-fs](https://github.com/anandkumarpatel/rest-fs)
===


GET /path/to/dir/
-----------------
  list contents of directory

  *optional*<br>
  ?recursive = list recursively default false

  returns: list of full file or folder paths (trailing slash tells if dir)

  ```
  res.body = [ { "fullDirPath" }, ... ]
  ```

#### File Stats
  ?stats = Return file stats for the directory instead of file listing.

  ```
  res.body = {
    dev: 16777220,
    mode: 16877,
    nlink: 31,
    uid: 501,
    gid: 20,
    rdev: 0,
    blksize: 4096,
    ino: 604862,
    size: 1054,
    blocks: 0,
    atime: Thu Mar 05 2015 11:38:47 GMT-0800 (PST),
    mtime: Thu Mar 05 2015 10:52:41 GMT-0800 (PST),
    ctime: Thu Mar 05 2015 10:52:41 GMT-0800 (PST)
  }
  ```

GET /path/to/file
-----------------
  returns contents of file<br>
  if dir, redirect to dir path

  *optional*<br>
  ?encoding = default utf8

  returns:
  res.body = { "file content" }

#### File Stats
  ?stats = Return file stats for the file instead of file's contents.

  ```
  res.body = {
    dev: 16777220,
    mode: 16877,
    nlink: 31,
    uid: 501,
    gid: 20,
    rdev: 0,
    blksize: 4096,
    ino: 604862,
    size: 1054,
    blocks: 0,
    atime: Thu Mar 05 2015 11:38:47 GMT-0800 (PST),
    mtime: Thu Mar 05 2015 10:52:41 GMT-0800 (PST),
    ctime: Thu Mar 05 2015 10:52:41 GMT-0800 (PST)
  }
  ```

POST /path/to/file/or/dir
-------------------------
  creates or overwrites file<br>
  creates dir if it does not exist.<br>
  renames or moves file if newPath exists<br>

  *optional*<br>
  body.newpath = if exist, move/rename file to this location.<br>
  body.clobber = if true will overwrite dest files (default false)<br>
  body.mkdirp = if true will create path to new location (default false)<br>
  body.mode = permissions of file (defaults: file 438(0666) dir 511(0777))<br>
  body.encoding = default utf8

  *optional for stream*<br>
  query.clobber = overwrite if exist
  query.mode = permissions of file (defaults: file 438(0666) dir 511(0777))<br>
  query.encoding = default utf8

  returns: modified resource. (trailing slash tells if dir)
  ```
  req.body = { "fullFileOrDirPath" }
  ```

PUT /path/to/file
-----------------
  creates file

  *optional*<br>
  body.mode = permissions of file (438 default 0666 octal)<br>
  body.encoding = default utf8

  returns: modified resource (trailing slash tells if dir)
  ```
  req.body = { "fullFilePath" }
  ```

DEL /path/to/dir/
-----------------
  deletes folder<br>
  if file returns error

  returns:
  ```
  req.body = {}
  ```

DEL /path/to/file
-----------------
  deletes file<br>
  if folder returns error

  returns:
  ```
  req.body = {}
  ```