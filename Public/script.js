fetch("/api/dashboard")
  .then(response => response.json())
  .then(data => {

    // User info
    document.getElementById("userInfo").innerText =
      `${data.user.name} | ${data.user.role} | ${data.user.location}`;

    // Learning progress
    const percent =
      (data.learningGoal.completedHours / data.learningGoal.targetHours) * 100;

    document.getElementById("progressBar").style.width = "20%";
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

    console.log("Courses from API.", data.courses);
    const mandatoryCourses = data.courses.filter(c => c.mandatory);
 
    const totalMandatory = mandatoryCourses.length;
    const completedMandatory = mandatoryCourses.filter(
      c => c.status === "Completed"
    ).length;
 
    const pendingMandatory = totalMandatory - completedMandatory;
 
    const compliancePercent =
      totalMandatory === 0 ? 100 : (completedMandatory / totalMandatory) * 100;
 
    document.getElementById("totalMandatory").innerText = totalMandatory;
    document.getElementById("completedMandatory").innerText = completedMandatory;
    document.getElementById("pendingMandatory").innerText = pendingMandatory;
 
    document.getElementById("complianceBar").style.width =
      Math.round(compliancePercent) + "%";
 
    document.getElementById("compliancePercent").innerText =
      Math.round(compliancePercent) + "% Compliance";
    });

    console.log("Button logic loaded");
    document.getElementById("completeBtn").addEventListener("click", () => {
  // Find mandatory course
  const mandatoryCourse = data.courses.find(c => c.mandatory);
 
  if (!mandatoryCourse) return;
 
  // Mark as completed
  mandatoryCourse.status = "Completed";
 
  // Recalculate compliance
  const mandatoryCourses = data.courses.filter(c => c.mandatory);
  const totalMandatory = mandatoryCourses.length;
  const completedMandatory = mandatoryCourses.filter(
    c => c.status === "Completed"
  ).length;
 
  const pendingMandatory = totalMandatory - completedMandatory;
  const compliancePercent =
    totalMandatory === 0 ? 100 : (completedMandatory / totalMandatory) * 100;
 
  // Update UI
  document.getElementById("completedMandatory").innerText = completedMandatory;
  document.getElementById("pendingMandatory").innerText = pendingMandatory;
 
  document.getElementById("complianceBar").style.width =
    Math.round(compliancePercent) + "%";
 
  document.getElementById("complianceBar").style.background = "green";
 
  document.getElementById("compliancePercent").innerText =
    Math.round(compliancePercent) + "% Compliance";
 
  // Disable button
  document.getElementById("completeBtn").disabled = true;
  document.getElementById("completeBtn").innerText = "Completed ✔";
});
  })
  .catch(err => {
    console.error("Error loading dashboard data:", err);
  });
