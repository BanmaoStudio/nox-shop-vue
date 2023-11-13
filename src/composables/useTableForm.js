export function useTableForm(data) {
    const { createFetch, updateFetch, formData, rules } = data

    const tableFormRef = ref(null)

    

    return {
        tableFormRef
    }
}