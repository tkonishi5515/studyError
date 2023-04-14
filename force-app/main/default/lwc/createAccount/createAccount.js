import { LightningElement, wire } from "lwc";
import { CurrentPageReference } from "lightning/navigation";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { NavigationMixin } from "lightning/navigation";

import insertContact from "@salesforce/apex/creatContact.insertContact";

export default class CreateAccount extends NavigationMixin(LightningElement) {
  currentPageReference = null;
  tableSeikyuContact = {};

  //表示されている取引先Idを取得
  @wire(CurrentPageReference)
  getStateParameters(currentPageReference) {
    this.recordId = currentPageReference.attributes.recordId;
  }

  //取引先責任者レコード作成をするApexを呼び出す
  async createContact() {
    //入力した値を取得する
    const inputContactFields = this.template.querySelectorAll(
      '[data-id="contactField"]'
    );

    //objectを作成する
    for (let i = 0; i < inputContactFields.length; i++) {
      const data = inputContactFields[i].value;
      this.tableSeikyuContact[inputContactFields[i].name] = data;
    }

    //Apexを呼び出す
    const result = await insertContact({
      createContact: this.tableSeikyuContact
    });

    //作成に成功した場合、トーストを表示する
    const evt = new ShowToastEvent({
      title: "取引先責任者を保存しました。",
      variant: "success",
      mode: "pester"
    });
    this.dispatchEvent(evt);

    //作成した取引先責任者のページに遷移する
    this[NavigationMixin.Navigate]({
      type: "standard__recordPage",
      attributes: {
        recordId: result,
        objectApiName: "Contact",
        actionName: "view"
      }
    });
  }
}
