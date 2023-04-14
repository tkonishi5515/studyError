trigger contactTrigger on Contact(after insert) {
  for (Contact con : Trigger.new) {
    if (con.Phone == null) {
      con.Phone.addError('電話番号を入れてください。');
    }
  }
}
