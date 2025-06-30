import type { DynForm, GroupedOption, SelectData } from "$lib/types";

 export const items: GroupedOption[] = [
  {
    name: 'ヘッド',
    options: [
      {
        label: 'ロフト 9.0度',
        value: '633924',
        price: '107800円'
      },
      {
        label: 'ロフト 10.0度',
        value: '633925',
        price: '107800円'
      },
      {
        label: 'ロフト 12.0度',
        value: '633926',
        price: '107800円'
      }
    ]
  }
 ];

 export const secondItems: GroupedOption[] = [
  {
    name: '特徴',
    options: [
      {
        label: 'AutoFelx SF 305x PINK/BLACK',
        value: '604871',
        price: '114,400円',
        image: 'https://static.wixstatic.com/media/b166e5_cab70dcd39cb40b591214ffee6afa520~mv2.png'
      },
      {
        label: 'AutoFelx SF 405 PINK/BLACK',
        value: '604872',
        price: '114,400円',
        image: 'https://static.wixstatic.com/media/b166e5_cab70dcd39cb40b591214ffee6afa520~mv2.png'
      },
      {
        label: 'AutoFelx SF 505 PINK/BLACK',
        value: '604873',
        price: '114,400円',
        image: 'https://static.wixstatic.com/media/b166e5_cab70dcd39cb40b591214ffee6afa520~mv2.png'
      },
      {
        label: 'AutoFelx SF 305x Yellow',
        value: '604874',
        price: '114,400円',
        image: 'https://static.wixstatic.com/media/b166e5_cab70dcd39cb40b591214ffee6afa520~mv2.png'
      },
      {
        label: 'AutoFelx SF 405 Yellow',
        value: '604875',
        price: '114,400円',
        image: 'https://static.wixstatic.com/media/b166e5_cab70dcd39cb40b591214ffee6afa520~mv2.png'
      },
      {
        label: 'AutoFelx SF 505 Yellow',
        value: '604876',
        price: '114,400円',
        image: 'https://static.wixstatic.com/media/b166e5_cab70dcd39cb40b591214ffee6afa520~mv2.png'
      },
      {
        label: 'AutoFelx SF 305x BLACK',
        value: '604877',
        price: '114,400円',
        image: 'https://static.wixstatic.com/media/b166e5_cab70dcd39cb40b591214ffee6afa520~mv2.png'
      }
    ]
  },
  {
    name: '特徴',
    options: [
      {
        label: 'JOY365 SF 405 PINK',
        value: '604883',
        price: '132,000円',
        image: 'https://static.wixstatic.com/media/b166e5_cab70dcd39cb40b591214ffee6afa520~mv2.png'
      },
      {
        label: 'JOY365 SF 405x PINK',
        value: '604884',
        price: '132,000円',
        image: 'https://static.wixstatic.com/media/b166e5_cab70dcd39cb40b591214ffee6afa520~mv2.png'
      },
    ]
  }
 ];

const fmdata: DynForm = {
  title: 'Form 1',
  action: '',
  sections: [
    {
      title: 'section1',
      questions: [
        {
          name: 'heads',
          label: 'ヘッド',
          options: items,
          discount: 20
        },
        {
          name: 'shafts',
          label: 'シャフト',
          options: secondItems,
          info:  'メモ：シャフトはセット割引に含まれません。'
        }
      ]
    }
  ]
}