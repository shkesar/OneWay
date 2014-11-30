package com.example.OneWay;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;

public class Splash extends Activity{

	ImageView logo;
	Animation anim;
	MediaPlayer audio;
	
	@SuppressLint("NewApi")
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);
		setContentView(R.layout.splash);
		getActionBar().hide();
		logo=(ImageView) findViewById(R.id.imageView1);
		anim=AnimationUtils.loadAnimation(getApplicationContext(), R.anim.animation);
		audio=MediaPlayer.create(getApplicationContext(), R.raw.splashsound);
		logo.setAnimation(anim);
		
		
		Thread t=new Thread(){
			@Override
			public void run() {
				// TODO Auto-generated method stub
				super.run();
				try {
					audio.start();
					Thread.sleep(2500);
					Intent i=new Intent(Splash.this,Menu.class);
					startActivity(i);
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		};
		t.start();
		
	}
	
	@Override
	protected void onPause() {
		// TODO Auto-generated method stub
		super.onPause();
		finish();
	}
}
