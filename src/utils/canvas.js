export const getRoundLine = (data) => {
    if (data.length === 0) return data
    let maxX = 0;
    let maxY = 0;
    data.forEach((ele) => {
        if (ele.x > maxX) {
            maxX = ele.x;
        }
        if (ele.y > maxY) {
            maxY = ele.y;
        }
    });

    const list1 = []
    for (let y = 0; y < maxY; y++) {
        const listY = data.filter((m) => m.y === y).sort((a, b) => a.x - b.x)
        const lenSubItem = listY.length
        if (listY && lenSubItem > 0) {
            list1.push(listY[0])
            if (lenSubItem > 1) {
                list1.push(listY[lenSubItem - 1])
                for (let j = 1; j < lenSubItem - 1; j++) {
                    if (
                        listY[j + 1].x - listY[j].x > 1 ||
                        listY[j].x - listY[j - 1].x > 1
                    ) {
                        list1.push(listY[j])
                    }
                }
            }
        }
    }

    for (let x = 0; x < maxX; x++) {
        const listX = data.filter((m) => m.x === x).sort((a, b) => a.y - b.y)
        const lenSubItem = listX.length
        if (listX && lenSubItem > 0) {
            list1.push(listX[0])
            if (lenSubItem > 1) {
                for (let j = 1; j < lenSubItem - 1; j++) {
                    if (
                        listX[j + 1].y - listX[j].y > 1 ||
                        listX[j].y - listX[j - 1].y > 1
                    ) {
                        list1.push(listX[j])
                    }
                }
                list1.push(listX[lenSubItem - 1])
            }
        }
    }

    return list1
}