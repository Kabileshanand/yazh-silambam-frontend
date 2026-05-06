const fs = require('fs');

let content = fs.readFileSync('src/pages/Home.jsx', 'utf8');

// 1. Add import
content = content.replace("import Contact from './Contact';", "import Contact from './Contact';\nimport CircularFeatures from '../components/CircularFeatures';");

// 2. Remove unused state variables
content = content.replace("    const [activeFeature, setActiveFeature] = useState(1);\n", "");
content = content.replace("    const [slideDirection, setSlideDirection] = useState(1); // 1 = up, -1 = down\n", "");

// 3. Remove goToFeature function
const goToFeatureRegex = /    const goToFeature = \[\s\S\]*?};\n/;
// Actually string replace is safer
const goToFeatureStr = `    const goToFeature = (nextIndex) => {
        setActiveFeature((prev) => {
            const next = ((nextIndex % features.length) + features.length) % features.length;
            const dir = next === prev ? 1 : next > prev ? 1 : -1;
            setSlideDirection(dir);
            return next;
        });
    };
    `;
content = content.replace(goToFeatureStr, "");

// 4. Update features
const oldFeatures = `    const features = useMemo(
        () => [
            {
                title: "Bare Hand Technique",
                link: "/bare-hand-techniques",
                imageSrc: "/Barehand%20Technique.png",
            },
            {
                title: "Stick Fencing",
                link: "/stick-fencing",
                imageSrc: "/Stick%20Fencing.png",
            },
            {
                title: "Weaponry Training",
                link: "/weaponry-training",
                imageSrc: "/Weaponry%20Training.png",
            },
        ],
        []
    );`;

const newFeatures = `    const features = useMemo(
        () => [
            {
                title: "Bare Hand Technique",
                link: "/bare-hand-techniques",
                imageSrc: "/Barehand%20Technique.png",
                description: "Master the fundamental bare hand techniques of Silambam. Build agility, speed, and focus without weapons.",
            },
            {
                title: "Stick Fencing",
                link: "/stick-fencing",
                imageSrc: "/Stick%20Fencing.png",
                description: "Learn the core art of Tamil stick fencing. Discover dynamic strikes, blocks, and footwork essential to Silambam.",
            },
            {
                title: "Weaponry Training",
                link: "/weaponry-training",
                imageSrc: "/Weaponry%20Training.png",
                description: "Train with traditional Tamil weapons. Master advanced techniques and deepen your cultural martial arts practice.",
            },
        ],
        []
    );`;
content = content.replace(oldFeatures, newFeatures);

// 5. Replace the What We Provide body
const sectionRegex = /<div className="relative flex items-center justify-center w-full">[\s\S]*?(?=<\/div>\n                <\/div>\n            <\/section>\n\n            {\/\* Why Choose Yazh Silambam \*\/})/;

content = content.replace(sectionRegex, `<CircularFeatures features={features} />\n                    `);

fs.writeFileSync('src/pages/Home.jsx', content);
console.log("Updated Home.jsx successfully");
