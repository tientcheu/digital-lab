package com.kyf.domain.entities;

public class StoreItem {

    private String id;
    private StoreAccount storeAccount;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public StoreAccount getStoreAccount() {
        return storeAccount;
    }

    public void setStoreAccount(StoreAccount storeAccount) {
        this.storeAccount = storeAccount;
    }
}
