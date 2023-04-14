public without sharing class creatContact {
  @AuraEnabled
  public static String insertContact(Contact createContact) {
    try {
      //取引先責任者を作成する
      Contact con = new Contact();
      con.FirstName = createContact.FirstName;
      con.LastName = createContact.LastName;
      con.Phone = createContact.Phone;
      con.AccountId = createContact.AccountId;
      insert con;

      return con.Id;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}
