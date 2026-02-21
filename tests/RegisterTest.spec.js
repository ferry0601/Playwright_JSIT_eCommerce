const {test,expect} = require('@playwright/test');
const {POManager} = require('../pages/POManager');
const {faker} = require('@faker-js/faker');
const datasetCust = JSON.parse(JSON.stringify(require('../utils/RegisCustomerData.json')));
const datasetMit = JSON.parse(JSON.stringify(require('../utils/RegisMitraData.json')));
const datasetMember = JSON.parse(JSON.stringify(require('../utils/RegisMemberData.json')));

let registerCustomer;
let registerMitra;
let registerMember;
test.beforeEach(async ({ page }) => {
    const poManager = new POManager(page);
    registerCustomer = poManager.getRegisterCustomer();
    registerMitra = poManager.getRegisterMitra();
    registerMember = poManager.getRegisterMember();
    await registerCustomer.GoTo();
});

test.describe.parallel('Registrasi Customer',()=>{

    test('@Registrasi Customer Valid Data',async ({page})=>{
        const customuser = datasetCust.validCustomer[0];
        await registerCustomer.navigateCustomerForm();
        await registerCustomer.submitFormCustomer(
            faker.person.fullName(),
            faker.internet.email(),
            faker.phone.number(),
            customuser.password,
            customuser.passwordConfirm);
        await registerCustomer.getSuccessCustomer();
    });

    for(const data of datasetCust.invaliduser){
        test(`@Registrasi Customer Invalid ${data.email}`,async ({page})=>{
            await registerCustomer.navigateCustomerForm();
            await registerCustomer.submitFormCustomer(
                data.name,
                data.email,
                data.phone,
                data.password,
                data.passwordConfirm
            );
            if(!data.name){
                const message = await registerCustomer.getEmptyMessage();
                await expect(message).toContain(data.errorMessage);
            }else{
                await expect(registerCustomer.getErrorLine())
                .toContainText(data.errorMessage);
            }
        });
    }

});


test.describe.parallel('Registrasi Mitra',()=>{
    test('@Registrasi Mitra valid',async ({page})=>{
        const data = datasetMit.validMitra[0];
        await registerMitra.navigateMitraForm();
        await registerMitra.submitFormMitra(
            faker.person.fullName(),
            faker.string.numeric(16),
            faker.internet.email(),
            faker.phone.number(),
            faker.company.name(),
            faker.helpers.arrayElement(data.kategori),
            faker.lorem.paragraph(),
            faker.location.streetAddress(),
            faker.string.numeric(15),
            faker.helpers.arrayElement(data.bank),
            faker.string.numeric(10),
            data.ktpPath,
            data.siupPath,
            data.password,
            data.passwordConfirm

        );
        await expect(registerMitra.getSuccessMitra()).toContainText(data.message);
    });

    for(const data of datasetMit.invalidMitra){
    test(`@Registrasi mitra invalid ${data.email}`,async ()=>{
        await registerMitra.navigateMitraForm();
        await registerMitra.submitFormMitra(
            data.name,
            faker.string.numeric(16),
            data.email,
            faker.phone.number(),
            faker.company.name(),
            faker.helpers.arrayElement(data.kategori),
            faker.lorem.paragraph(),
            faker.location.streetAddress(),
            faker.string.numeric(15),
            faker.helpers.arrayElement(data.bank),
            faker.string.numeric(10),
            data.ktpPath,
            data.siupPath,
            data.password,
            data.passwordConfirm

        );
        if(!data.name){
                const message = await registerMitra.getEmptyMessage();
                await expect(message).toContain(data.errorMessage);
            }else{
                await expect(registerMitra.getErrorMessage())
                .toContainText(data.errorMessage);
            }
    });
    }
});
 

test.describe.parallel('Registrasi Member',()=>{
    test.only('@Registrasi Member valid',async ({page})=>{
        const data = datasetMember.validMember[0];
        await registerMember.navigateMemberForm();
        await registerMember.submitFormMember(
            faker.person.fullName(),
            faker.helpers.arrayElement(data.gender),
            faker.location.city(),
            data.tanggalLahir,
            faker.string.numeric(16),
            faker.phone.number(),
            faker.internet.email(),
            faker.location.streetAddress(),
            faker.location.state(),
            faker.location.city(),
            faker.location.city(),
            faker.location.city(),
            faker.company.name(),
            faker.company.name(),
            faker.person.jobTitle(),
            faker.string.numeric(15),
            faker.helpers.arrayElement(data.bank),
            faker.string.numeric(10),
            data.ktpPath,
            data.pasPhotoPath,
            data.password,
            data.passwordConfirm

        );
        await expect(registerMitra.getSuccessMitra()).toContainText(data.message);
    });

    for(const data of datasetMember.invalidMember){
    test(`@Registrasi member invalid ${data.email}`,async ()=>{
        await registerMember.navigateMemberForm();
        await registerMember.submitFormMember(
            data.name,
            faker.helpers.arrayElement(data.gender),
            faker.location.city(),
            data.tanggalLahir,
            faker.string.numeric(16),
            faker.phone.number(),
            data.email,
            faker.location.streetAddress(),
            faker.location.state(),
            faker.location.city(),
            faker.location.city(),
            faker.location.city(),
            faker.company.name(),
            faker.company.name(),
            faker.person.jobTitle(),
            faker.string.numeric(15),
            faker.helpers.arrayElement(data.bank),
            faker.string.numeric(10),
            data.ktpPath,
            data.pasPhotoPath,
            data.password,
            data.passwordConfirm

        );
        if(!data.name){
                const message = await registerMember.getEmptyMessage();
                await expect(message).toContain(data.errorMessage);
            }else{
                await expect(registerMember.getErrorMessage())
                .toContainText(data.errorMessage);
            }
    });
    }
});