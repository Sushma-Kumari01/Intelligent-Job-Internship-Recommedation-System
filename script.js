const opportunities = [
    {
        title: "Frontend Developer Intern",
        company: "Demo Technology Company",
        type: "Internship",
        mode: "Remote",
        branch: ["IT", "CSE", "BCA"],
        skills: ["html", "css", "javascript"],
        description: "Work on website design and frontend development."
    },

    {
        title: "Java Developer Intern",
        company: "Demo Software Company",
        type: "Internship",
        mode: "Hybrid",
        branch: ["IT", "CSE", "BCA"],
        skills: ["java", "sql", "dsa"],
        description: "Practice Java programming and problem solving."
    },

    {
        title: "Python Developer",
        company: "Demo Analytics Company",
        type: "Job",
        mode: "On-site",
        branch: ["IT", "CSE", "BCA", "Other"],
        skills: ["python", "sql", "data analysis"],
        description: "Work on Python applications and data processing."
    },

    {
        title: "Web Developer",
        company: "Demo Web Solutions",
        type: "Job",
        mode: "Remote",
        branch: ["IT", "CSE", "BCA"],
        skills: ["html", "css", "javascript", "node.js"],
        description: "Build and maintain web applications."
    },

    {
        title: "Data Analyst Intern",
        company: "Demo Data Company",
        type: "Internship",
        mode: "Hybrid",
        branch: ["IT", "CSE", "BCA", "Other"],
        skills: ["python", "sql", "excel"],
        description: "Analyze datasets and prepare reports."
    },

    {
        title: "Software Developer",
        company: "Demo Software Solutions",
        type: "Job",
        mode: "On-site",
        branch: ["IT", "CSE", "BCA"],
        skills: ["java", "python", "dsa", "sql"],
        description: "Develop software and solve programming problems."
    }
];

const form = document.getElementById("profileForm");
const recommendationList = document.getElementById("recommendationList");
const resultMessage = document.getElementById("resultMessage");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document
        .getElementById("studentName")
        .value.trim();

    const branch = document
        .getElementById("branch")
        .value;

    const education = document
        .getElementById("education")
        .value;

    const skills = document
        .getElementById("skills")
        .value
        .toLowerCase()
        .split(",")
        .map(skill => skill.trim())
        .filter(skill => skill !== "");

    const opportunityType = document
        .getElementById("opportunity")
        .value;

    const mode = document
        .getElementById("mode")
        .value;

    if (skills.length === 0) {
        resultMessage.textContent =
            "Please enter at least one technical skill.";

        recommendationList.replaceChildren();
        return;
    }

    const results = opportunities
        .filter(item => {
            const branchMatches =
                item.branch.includes(branch);

            const typeMatches =
                opportunityType === "All" ||
                item.type === opportunityType;

            const modeMatches =
                mode === "All" ||
                item.mode === mode;

            return branchMatches && typeMatches && modeMatches;
        })
        .map(item => {
            const matchingSkills = skills.filter(skill =>
                item.skills.includes(skill)
            );

            const matchPercentage = Math.round(
                matchingSkills.length / item.skills.length * 100
            );

            return {
                ...item,
                matchingSkills,
                matchPercentage
            };
        })
        .filter(item => item.matchPercentage > 0)
        .sort((a, b) =>
            b.matchPercentage - a.matchPercentage
        );

    recommendationList.replaceChildren();

    if (results.length === 0) {
        resultMessage.textContent =
            `Hi ${name}, no matching opportunities were found in our demo list. Try adding more skills or changing your filters.`;

        return;
    }

    resultMessage.textContent =
        `Hi ${name}! We found ${results.length} matching opportunities for your profile (${education}).`;

    results.forEach(item => {
        const card = document.createElement("article");
        card.className = "job-card";

        const title = document.createElement("h3");
        title.textContent = item.title;

        const company = document.createElement("p");
        company.textContent = `Company: ${item.company}`;

        const type = document.createElement("p");
        type.textContent = `Type: ${item.type}`;

        const workMode = document.createElement("p");
        workMode.textContent = `Work Mode: ${item.mode}`;

        const match = document.createElement("span");
        match.className = "match";
        match.textContent = `${item.matchPercentage}% Skill Match`;

        const matchedSkills = document.createElement("p");
        matchedSkills.textContent =
            `Matching Skills: ${item.matchingSkills.join(", ")}`;

        const description = document.createElement("p");
        description.textContent = item.description;

        card.append(
            title,
            company,
            type,
            workMode,
            match,
            matchedSkills,
            description
        );

        recommendationList.appendChild(card);
    });
});