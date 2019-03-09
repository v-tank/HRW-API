function manageInterviews() {
  let type = "interviews";
  let payload = {
    "title": "Interview with Mark",
    "notes": "Assess the candidate for system design concepts",
    "resume_url": "www.example.com/resumes/71884928",
    "interviewers": [
      "vaibhav+100@hackerrank.com"
    ],
    "result_url": "www.techcorp.org/interview_ended",
    "candidate": {
      "name": "Mark Ramone",
      "email": "v.tank@yahoo.com"
    },
    "send_email": false,
    "metadata": {}
  }

  axios.post(baseURL + type, payload, 
    {
    auth: {
      username: keys.auth.ACCESS_TOKEN,
      password: keys.auth.PASSWORD
    }
  }).then( res => {
    console.log(res.data);
  }).catch( err => {
    console.log(err);
  })
}

module.exports = manageInterviews;