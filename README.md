<h1>What is Music Tag? </h1>

This is an application built for a Music Publisher. It it a way for the 
them "tag" their music with descriptions, composer information, and 
export that metadata into excel sheet. It is built specicifically for a certain music publisher but 
can serve as a template for your own.

<h2>How does it work </h2>
<ul>
  <li> You place your audio files (MUST BE .WAV) in a folder under public/dist/wav.The folder must follow this naming convention by starting with capital R followed by a number, (e.g. R40, R22)</li>
   <li>The wav files in the folder should have the name of the track title</li>
  <li>Go to upload/export, type the name of folder and click upload. The application will read the name of the files and 
save them to the database.</li>
  <li>You'll see them listed on background instrumentals. You can then click edit and start tagging.</li>
  <li>When you're done tagging, go to upload/export and click Source Audio Metadata. You'll download a
  excel sheet with metadata for the songs</li>
 </ul>

<h2>Issues</h3>
<ul>
  <li>If you alter the wav files, wav folder or have duplicate tracks names after uploading, you'll run into issues and have innacurate data</li>
   <li>The application uses the wav filename as the song title. If wav filename isn't that, you'll need to change it</li>
 </ul>

<h2>Installation </h2>
<code>npm install 
</code>
<code>npm run build 
</code>
<code>npm run start 
</code>
<ul>
  <li>You'll also need to up a MongoDB database and a .env file.
</li>
  <li>The .env file should contain the variable IP = your ip address.</li>
</ul>

 

