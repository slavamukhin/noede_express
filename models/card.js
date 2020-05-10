const path = require('path');
const fs = require('fs');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'card.json'
);

class Card {
    static async add(course) {
        const card = await Card.fetch();

        const courseIndex = card.courses.findIndex(courseItem => courseItem.id === course.id);
        const condidate = card.courses[courseIndex];

        if (condidate) {
            condidate.count++;
            card.courses[courseIndex] = condidate;
        } else {
            course.count = 1;
            card.courses.push(course);
        }

        card.price += +course.price;

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(card), error => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            })
        })
    }

    static fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(p, 'utf-8', (error, content) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(JSON.parse(content));
                }
            })
        })
    }
}

module.exports = Card