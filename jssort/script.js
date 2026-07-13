function bubbleSort(arr) {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {

        let swapped = false;

        for (let j = 0; j < n - i - 1; j++) {

            if (arr[j] > arr[j + 1]) {

                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;

            }

        }

        if (!swapped) {
            break;
        }

    }

    return arr;
}

function insertionSort(arr) {

    const n = arr.length;

    for (let i = 1; i < n; i++) {

        let key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {

            arr[j + 1] = arr[j];
            j--;

        }

        arr[j + 1] = key;

    }

    return arr;
}

function selectionSort(arr) {

    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {

        let minIndex = i;

        for (let j = i + 1; j < n; j++) {

            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }

        }

        if (minIndex !== i) {

            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];

        }

    }

    return arr;
}

function getNumbers() {

    const input = document.getElementById("numbers").value;

    return input
        .split(",")
        .map(number => Number(number.trim()));

}

function showResult(arr) {

    document.getElementById("result").textContent = arr.join(", ");

}

function sortArray(type) {

    const arr = getNumbers();

    if (arr.some(isNaN)) {

        document.getElementById("result").textContent =
            "Будь ласка, введіть тільки числа.";

        return;
    }

    let sortedArray;

    switch (type) {

        case "bubble":
            sortedArray = bubbleSort([...arr]);
            break;

        case "selection":
            sortedArray = selectionSort([...arr]);
            break;

        case "insertion":
            sortedArray = insertionSort([...arr]);
            break;

    }

    showResult(sortedArray);

}

document.getElementById("bubbleBtn")
document.addEventListener("click", () => sortArray("bubble"));

document.getElementById("selectionBtn")
document.addEventListener("click", () => sortArray("selection"));

document.getElementById("insertionBtn")
document.addEventListener("click", () => sortArray("insertion"));