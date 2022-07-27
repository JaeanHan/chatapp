package com.cos.reactivetest;

import org.reactivestreams.Subscriber;
import org.reactivestreams.Subscription;

import java.util.Iterator;

// 구독 정보(구독자, 어떤 데이터를 구독 할 지)
public class MySubscription implements Subscription {
    private Subscriber s;
    private Iterator<Integer> it;

    public MySubscription(Subscriber s, Iterable<Integer> its) {
        this.s = s;
        this.it = its.iterator();
    }
    @Override
    public void request(long l) { // 1
        while(l > 0) {
            if(it.hasNext()) {
                s.onNext(it.next()); // 1이 날아감
            } else {
                s.onComplete();
                break;
            }
            l--;
        }
    }

    @Override
    public void cancel() {

    }
}
