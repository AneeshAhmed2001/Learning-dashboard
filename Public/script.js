fetch("/api/dashboard")
  .then(response => response.json())
  .then(data => {

    // User info
    document.getElementById("userInfo").innerText =
      `${data.user.name} | ${data.user.role} | ${data.user.location}`;

    // Learning progress
    const percent =
      (data.learningGoal.completedHours / data.learningGoal.targetHours) * 100;

    document.getElementById("progressBar").style.width = "80%";
    document.getElementById("hoursText").innerText =
      `${data.learningGoal.completedHours} / ${data.learningGoal.targetHours} hours completed`;

    // Courses list
    const courseList = document.getElementById("courseList");
    courseList.innerHTML = "";

    data.courses.forEach(course => {
      const li = document.createElement("li");
      li.innerText = `${course.title} - ${course.status}`;

      if (course.status === "Completed") li.className = "completed";
      else if (course.status === "In Progress") li.className = "in-progress";
      else li.className = "not-started";

      courseList.appendChild(li);
    });
  })
  .catch(err => {
    console.error("Error loading dashboard data:", err);
  });
