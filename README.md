<h1 align="center">
  <br>
  <a href="https://techtracker.gibbyb.com"><img src="https://git.gibbyb.com/gib/Tech_Tracker_Web/raw/branch/master/public/images/tech_tracker_logo.png" alt="Tech Tracker Logo" width="100"></a>
  <br>
  <b>Tech Tracker</b>
  <br>
</h1>

# [Find Here](https://techtracker.gibbyb.com/)

- Application used by COG employees to update their status & location throughout the day.

<details>
<summary>
<h3>How to run:</h3>
</summary>

I'd recommend installing pnpm. Clone the repo, then rename env.example to .env & fill it out. 

```bash
mv ./env.example ./.env
```

Run 

```bash
pnpm install
```

to install all dependencies.

Feel free to use whichever providers you would like with Auth.js. Outside of changing the logo on the sign in button, you should be able to swap easily. Just ensure you read over the documentation.

Once you have all your environment variables, you can run 

```bash
pnpm db:push
```

 to automatically push the database schema to your database. You can then run 

 ```bash
 pnpm db:studio
 ```

 to get a nice web ui where you can manipulate data in your database. Once your database is set up & you have added your users, you can run 

 ```bash
pnpm dev
 ```

 to start your development environment on port 3000.

 For prod, look in the .prod folder. You will find a Dockerfile which when started will always pull any updates before starting with a custom command `pnpm go` which is aliased to `git pull && next build && next start`
 </details>