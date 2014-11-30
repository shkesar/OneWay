package com.example.OneWay;

import org.apache.cordova.CordovaActivity;

import android.os.Bundle;

public class Menu extends CordovaActivity{
	
	@Override
	public void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		super.init();
		loadUrl("file:///android_asset/www/welcome.html");
	}

}
