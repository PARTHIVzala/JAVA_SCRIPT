function calculateResult() {
    let name = document.getElementById("name").value;
    let s1 = parseInt(document.getElementById("sub1").value);
    let s2 = parseInt(document.getElementById("sub2").value);
    let s3 = parseInt(document.getElementById("sub3").value);

    if (isNaN(s1) || isNaN(s2) || isNaN(s3) || name === "") {
        alert("Please enter all details!");
        return;
    }

    let total = s1 + s2 + s3;
    let percentage = total / 3;

    let grade = "";
    if (percentage >= 90) grade = "A+";
    else if (percentage >= 75) grade = "A";
    else if (percentage >= 60) grade = "B";
    else if (percentage >= 50) grade = "C";
    else grade = "Fail";

    document.getElementById("output").innerHTML =
        `<strong>Name:</strong> ${name}<br>
         <strong>Total Marks:</strong> ${total}<br>
         <strong>Percentage:</strong> ${percentage.toFixed(2)}%<br>
         <strong>Grade:</strong> ${grade}`;
}
