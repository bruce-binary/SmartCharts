export function binarySearch(arr, val, cmp = a => a) {
    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
        const mid = (start + end) >> 1;

        if (cmp(arr[mid]) === cmp(val)) {
            return mid;
        }

        if (cmp(val) < cmp(arr[mid])) {
            end = mid - 1;
        } else {
            start = mid + 1;
        }
    }

    return -1;
}
