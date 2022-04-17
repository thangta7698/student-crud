export function getMarkColor(mark: number): string {
    if (mark >= 8) {
        return 'green';
    }
    if (mark >= 4) {
        return 'goldenrod';
    }
    else {
        return 'red';
    }
};
export function editGender(gender: string): string {
    if (!gender) return '';
    return `${gender[0].toUpperCase()}${gender.slice(1)}`;
}