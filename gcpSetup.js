const fs=require('fs')

fs.writeFile(process.env.GCP_KEYFILE, process.env.GCP_CRED, (err) => {})