<!-- Issues:
- initially tried 'if (isMainThread) {}' inside route controller, but it wasn't running the 'else {}'
// reason for that problem was because it was wrapped in a controller func that was not IIFE/not called in same page
// 'if (isMainThread) {}' reloads page after it is run the inital time
// since controller func was called by the route.get() and not called within the page itself, 'the else {}' and rest of code is not run 
// next attempted solution was to spawn worker thread through middleware
- worker spawned by middleware was not sending msg back to parent
// expected function result occurred, but parentPort method was causing error
// root cause was middleware thread spawner was actually just calling next and not spawning worker
// worker thread was still treated as a route controller, which does not call itself 
// route controller was not utilizing the worker threads
// had to refactor route controller to just a function and call it within the page and removed its export
// route controller instead was used to spawn worker threads and tasks for workers are kept in separate module
- execution time not always quicker than without worker threads
// simple encryption/crypto tasks did not see significant improvement in task completion times until task became larger
// i.e more files/more crypto tasks to complete at once
// worker threads can improve the scalability of this app -->

# NodeJS File Encryptor/Decryptor

As the title/app name suggests, the purpose of this backend app is to encrypt/decrypt file contents. I developed this app because I wanted to learn more about concurrency in javascript and how to use the worker_threads module. I was not sure of a personal use case, but I came up with this app idea since my family and I send personal documents to each other and they can be quite distrustful of the security of technologies. This app is also able to encrypt/decrypt entire directories/folders using worker threads for better performance. Encryption/decryption is done through the built-in crypto module.
