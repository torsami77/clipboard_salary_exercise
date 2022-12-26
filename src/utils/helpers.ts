const departments_structure = [
    {
        department_name: "Engineering",
        sub_department: ["Platform"]
    },
    {
        department_name: "Banking",
        sub_department: ["Loan"]
    },
    {
        department_name: "Operations",
        sub_department: ["CustomerOnboarding"]
    },
    {
        department_name: "Administration",
        sub_department: ["Agriculture"]
    }
];

const currencies = ['USD', 'EUR', 'INR'];

const summary_statistics_formula = (array: object[], column: string) => {
    let values = array.map((item: any) => parseInt(item[column]))
    const ss_sorted = values.sort((a, b) => a - b);
    const max = ss_sorted[values.length - 1]
    const min = ss_sorted[0]
    const mean = values.reduce((a, b) => a + b) / array.length

    return {
        max,
        min,
        mean,
        category: ''
    }
}

export { departments_structure, currencies, summary_statistics_formula }