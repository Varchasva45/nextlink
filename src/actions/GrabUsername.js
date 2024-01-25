"use server";
export default async function handleFormSubmit(formData) {
    console.log(formData.get('userName'));
}