package com.movie24htrending;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.airship.customwebview.CustomWebViewPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.rnfs.RNFSPackage;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new CustomWebViewPackage(),
            new FastImageViewPackage(),
            new RNFSPackage(),
            new ReactNativeYouTube(),
            new RNFetchBlobPackage(),
            new ReactNativeConfigPackage(),
            new OrientationPackage(),
            new VectorIconsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index.android";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}