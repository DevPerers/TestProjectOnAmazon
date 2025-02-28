import { When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import { HomePage } from '../../../pages/homePage';
import { ProductDetailsPage } from '../../../pages/productDetailsPage';
import { CartPage } from '../../../pages/cartPage';

const homePage = new HomePage();
const productDetailsPage = new ProductDetailsPage();
const cartPage = new CartPage();

let productTitleFromSearchResult: string;
let unitPriceFromProductDetails: string;
let qtyAmount: number;

When('I select {string} from the catergory list', (menuOption) => {
    homePage.DismissChangeDiliveryAddressPopUp();
    homePage.SelectFromMenuDropDown(menuOption);
});

And('I search by entering term of {string}', (searchOption) => {
    homePage.SearchByGivenValue(searchOption);
});

And('I select Customer Reviews as 4 Stars & Up', () => {
    homePage.SelectCustomerReviewFourStarAndUp();
});

And('I select Language as {string}', (languageOption) => {
    homePage.SelectLanguage(languageOption);
});

And('I select {string} item from the list', (itemNumer) => {
    homePage.getProductTitleElement(parseInt(itemNumer)).then(($txt) => {
        productTitleFromSearchResult = $txt.text();
    });
    homePage.SelectRecordFromTheSearchResult(parseInt(itemNumer));
});

Then('I verify the project details on product details page', () => {
    productDetailsPage.verifyProductTitle(productTitleFromSearchResult);
    unitPriceFromProductDetails = productDetailsPage.getUnitPrice();
});

When('I select quantity as {string}', (qtyValue) => {
    qtyAmount = qtyValue;
    productDetailsPage.selectQty(qtyValue);
});

And('I select add to cart', () => {
    productDetailsPage.selectAddToCart();
});

And('I click on go to cart', () => {
    productDetailsPage.selectGoToCart();
});

Then('I verify the cart details', () => {
    cartPage.verifyProductTitle(productTitleFromSearchResult);
    cartPage.verifyQtyFormDDL(qtyAmount);
    cartPage.verifyQtyFormLabel(qtyAmount);
    cartPage.verifyTotalAmount(unitPriceFromProductDetails);
});

When('I clear the cart', () => {
    cartPage.deleteCartDetail();
});

Then('I verify the clear cart details', () => {
    cartPage.verifyTotalAmount('$0.00');
});
