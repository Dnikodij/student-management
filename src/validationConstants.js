export const firstNameRules = [
    (value) => !!value || "First name is required",
    (value) => value.length >= 3 || "Name must be at least 3 characters",
];
export const lastNameRules = [
    (value) => !!value || "Last name is required",
    (value) => value.length >= 3 || "Name must be at least 3 characters",
];
export const indexYearRules = [
    (value) => !!value || "Index year is required",
    (value) => (value >= 2000 && value <= 2100) || "Index year must be between 2000 and 2100",
];
export const indexNumberRules = [
    (value) => !!value || "Index number is required",
    (value) => String(value).length === 4 || "Index number must be 4 characters",
];
export const currentYearOfStudyRules = [
    (value) => !!value || "Current year of study is required",
    (value) => String(value).length === 1 || "Current year of study must be  1 character",
];

